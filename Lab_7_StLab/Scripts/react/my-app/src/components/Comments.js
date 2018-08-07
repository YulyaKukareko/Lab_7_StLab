import React from 'react';
var axios = require('axios')
import { render } from 'react-dom';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

export default class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], idPost:this.props.idPost, currentImage: 0, author: [], comment:""};
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this)
        this.onChange = this.onChange.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    componentDidMount() {
        const objPost = {idPost: this.state.idPost};
        debugger;
        axios.post('searchAuthor',objPost)
            .then((response)=> {
                debugger;
                for(var j=0;j<response.data.length;j+=2){
                    debugger;
                    const obj ={ authorName:response.data[j],pathToPage:[{src: response.data[j+1], width:1, height:1} ] }
                    this.setState({
                        author: [...this.state.author, obj]
                    });
                }});
        axios.post('searchComments',objPost)
            .then((response)=> {
                debugger;
                for(var j=0;j<response.data.length;j+=2){
                    debugger;
                    const obj ={ author:response.data[j],text:response.data[j+1]  }
                    this.setState({
                        data: [...this.state.data, obj]
                    });
                }});
        debugger;
    }

    openLightbox(event, obj) {
        this.setState({
            currentImage: obj.index,
            lightboxIsOpen: true,
        });
    }

    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false,
        });
    }

    gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    }

    gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    addComment(){
        var obj = {};
        obj.idPost = this.state.idPost;
        obj.text = this.state.comment;
        axios.post('addComment', obj);
        ReactDOM.render(
            <MyComponent idActiveUser={idUser}/>,
            document.getElementById("app")
        );
    }

    render() {
        debugger;
        return (
            <div>
                {this.state.author.map(item => <div><span>{item.authorName}</span>
                    <Gallery photos={item.pathToPage} onClick={this.openLightbox} />
                    <Lightbox images={item.pathToPage}
                        onClose={this.closeLightbox}
                        onClickPrev={this.gotoPrevious}
                        onClickNext={this.gotoNext}
                        currentImage={this.state.currentImage}
                        isOpen={this.state.lightboxIsOpen}
                    /></div>)}
                {this.state.data.map(item => <div><span>{item.author}</span>
                    <p>{item.text}</p></div>)}
                    <div>
                        <input typae="text" name="comment" onChange={this.onChange}/>
                        <button onClick={this.addComment}>Delete photo</button>
                    </div>
            </div>
         )
    }
}

//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан по шаблону.
//
//     Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//     Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Lab_7_StLab
{
    using System;
    using System.Collections.Generic;
    
    public partial class UsersImagesComments
    {
        public int Id { get; set; }
        public int IdPost { get; set; }
        public int IdUser { get; set; }
        public string Comment { get; set; }
    
        public virtual Users Users { get; set; }
        public virtual UsersImages UsersImages { get; set; }
    }
}
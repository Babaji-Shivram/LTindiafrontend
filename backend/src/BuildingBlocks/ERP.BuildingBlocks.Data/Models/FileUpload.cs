using System;
using System.Collections.Generic;

namespace ERP.BuildingBlocks.Data.Models;

public partial class FileUpload
{
    public int Id { get; set; }

    public string? FileName { get; set; }

    public string? FileType { get; set; }

    public string? FilePath { get; set; }

    public DateTime? UploadDate { get; set; }

    public string? FileExtension { get; set; }

    public string? MimeType { get; set; }
}

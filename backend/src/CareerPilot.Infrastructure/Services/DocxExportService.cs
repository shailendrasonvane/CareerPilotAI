using CareerPilot.Application.Interfaces.Repositories;
using CareerPilot.Application.Interfaces.Services;
using CareerPilot.Application.DTOs.Resume;
using CareerPilot.Shared;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace CareerPilot.Infrastructure.Services;

public class DocxExportService : IDocxExportService
{
    private readonly IResumeService _resumeService;

    public DocxExportService(IResumeService resumeService)
    {
        _resumeService = resumeService;
    }

    public Task<Result<ExportResult>> ExportPdfAsync(int userId, int resumeId, ExportRequest request)
    {
        throw new NotImplementedException("Use PdfExportService for PDF export.");
    }

    public async Task<Result<ExportResult>> ExportDocxAsync(int userId, int resumeId, ExportRequest request)
    {
        var resumeResult = await _resumeService.GetResumeByIdAsync(userId, resumeId);
        if (!resumeResult.IsSuccess) return Result<ExportResult>.Failure(resumeResult.Message);

        var resume = resumeResult.Value;

        try
        {
            using var memStream = new MemoryStream();
            using (var wordDocument = WordprocessingDocument.Create(memStream, WordprocessingDocumentType.Document))
            {
                // Add Styles
                var mainPart = wordDocument.AddMainDocumentPart();
                StyleDefinitionsPart stylePart = mainPart.AddNewPart<StyleDefinitionsPart>();
                GenerateStyleDefinitionsPartContent(stylePart);

                mainPart.Document = new Document();
                var body = mainPart.Document.AppendChild(new Body());

                // Set Section Properties (Standard Margins for ATS)
                SectionProperties sectionProps = new SectionProperties();
                PageMargin pageMargin = new PageMargin() { Top = 720, Right = 720, Bottom = 720, Left = 720 }; // 0.5 inch
                sectionProps.Append(pageMargin);
                body.Append(sectionProps);

                // --- HEADER SECTION (Centered for Professional Look) ---
                var headerPara = body.AppendChild(new Paragraph(new ParagraphProperties(new Justification { Val = JustificationValues.Center })));
                ApplyStyle(headerPara, "Heading1");
                headerPara.AppendChild(new Run(new Text($"{resume.PersonalDetails.FirstName} {resume.PersonalDetails.LastName}")));

                if (!string.IsNullOrEmpty(resume.PersonalDetails.JobTitle))
                {
                    var titlePara = body.AppendChild(new Paragraph(new ParagraphProperties(new Justification { Val = JustificationValues.Center })));
                    ApplyStyle(titlePara, "Subtitle");
                    titlePara.AppendChild(new Run(new Text(resume.PersonalDetails.JobTitle)));
                }

                // Contact Info
                var contactPara = body.AppendChild(new Paragraph(new ParagraphProperties(new Justification { Val = JustificationValues.Center })));
                var contactInfo = new List<string>();
                if (!string.IsNullOrEmpty(resume.PersonalDetails.Email)) contactInfo.Add(resume.PersonalDetails.Email);
                if (!string.IsNullOrEmpty(resume.PersonalDetails.Phone)) contactInfo.Add(resume.PersonalDetails.Phone);
                var location = string.Join(", ", new[] { resume.PersonalDetails.City, resume.PersonalDetails.Country }.Where(s => !string.IsNullOrEmpty(s)));
                if (!string.IsNullOrEmpty(location)) contactInfo.Add(location);
                
                var contactRun = contactPara.AppendChild(new Run());
                contactRun.AppendChild(new RunProperties(new FontSize { Val = "18" }, new Color { Val = "666666" }));
                contactRun.AppendChild(new Text(string.Join("  |  ", contactInfo)));

                // Add LinkedIn/GitHub if available
                if (!string.IsNullOrEmpty(resume.PersonalDetails.LinkedInUrl) || !string.IsNullOrEmpty(resume.PersonalDetails.GitHubUrl))
                {
                    var linksPara = body.AppendChild(new Paragraph(new ParagraphProperties(new Justification { Val = JustificationValues.Center })));
                    var links = new List<string>();
                    if (!string.IsNullOrEmpty(resume.PersonalDetails.LinkedInUrl)) links.Add(resume.PersonalDetails.LinkedInUrl);
                    if (!string.IsNullOrEmpty(resume.PersonalDetails.GitHubUrl)) links.Add(resume.PersonalDetails.GitHubUrl);
                    
                    var linksRun = linksPara.AppendChild(new Run());
                    linksRun.AppendChild(new RunProperties(new FontSize { Val = "16" }, new Color { Val = "444444" }));
                    linksRun.AppendChild(new Text(string.Join("  |  ", links)));
                }

                body.AppendChild(new Paragraph(new Run(new Break())));

                // --- SUMMARY ---
                if (!string.IsNullOrEmpty(resume.Summary))
                {
                    AddSectionHeading(body, "PROFESSIONAL SUMMARY");
                    var summaryPara = body.AppendChild(new Paragraph());
                    summaryPara.AppendChild(new Run(new Text(resume.Summary)));
                    body.AppendChild(new Paragraph(new Run(new Break())));
                }

                // --- EXPERIENCE ---
                if (resume.Experiences?.Any() == true)
                {
                    AddSectionHeading(body, "EXPERIENCE");
                    foreach (var exp in resume.Experiences.OrderByDescending(e => e.StartDate))
                    {
                        var expTable = body.AppendChild(new Table());
                        SetTableWidth(expTable, "5000");

                        var row = expTable.AppendChild(new TableRow());
                        
                        var leftCell = row.AppendChild(new TableCell());
                        var p1 = leftCell.AppendChild(new Paragraph());
                        var r1 = p1.AppendChild(new Run(new RunProperties(new Bold()), new Text(exp.Position)));
                        var p2 = leftCell.AppendChild(new Paragraph(new Run(new Text(exp.CompanyName))));

                        var rightCell = row.AppendChild(new TableCell());
                        var p3 = rightCell.AppendChild(new Paragraph(new ParagraphProperties(new Justification { Val = JustificationValues.Right })));
                        p3.AppendChild(new Run(new Bold(), new Text($"{exp.StartDate:MMM yyyy} - {(exp.IsCurrentJob ? "Present" : exp.EndDate?.ToString("MMM yyyy"))}")));
                        
                        var p4 = rightCell.AppendChild(new Paragraph(new ParagraphProperties(new Justification { Val = JustificationValues.Right })));
                        p4.AppendChild(new Run(new Color { Val = "666666" }, new Text(exp.Location ?? "")));

                        if (!string.IsNullOrEmpty(exp.Description))
                        {
                            var descPara = body.AppendChild(new Paragraph());
                            descPara.AppendChild(new Run(new RunProperties(new FontSize { Val = "20" }), new Text(exp.Description)));
                        }
                        body.AppendChild(new Paragraph(new Run(new Break())));
                    }
                }

                // --- EDUCATION ---
                if (resume.Educations?.Any() == true)
                {
                    AddSectionHeading(body, "EDUCATION");
                    foreach (var edu in resume.Educations.OrderByDescending(e => e.EndDate))
                    {
                        var eduTable = body.AppendChild(new Table());
                        SetTableWidth(eduTable, "5000");
                        var row = eduTable.AppendChild(new TableRow());
                        
                        var leftCell = row.AppendChild(new TableCell());
                        leftCell.AppendChild(new Paragraph(new Run(new RunProperties(new Bold()), new Text($"{edu.Degree} in {edu.FieldOfStudy}"))));
                        leftCell.AppendChild(new Paragraph(new Run(new Text(edu.InstitutionName))));

                        var rightCell = row.AppendChild(new TableCell());
                        var p2 = rightCell.AppendChild(new Paragraph(new ParagraphProperties(new Justification { Val = JustificationValues.Right })));
                        p2.AppendChild(new Run(new Bold(), new Text(edu.EndDate?.ToString("yyyy") ?? "")));

                        body.AppendChild(new Paragraph(new Run(new Break())));
                    }
                }

                // --- SKILLS ---
                if (resume.Skills?.Any() == true)
                {
                    AddSectionHeading(body, "SKILLS");
                    var skillsPara = body.AppendChild(new Paragraph());
                    var skillsText = string.Join("  •  ", resume.Skills.Select(s => s.SkillName));
                    skillsPara.AppendChild(new Run(new Text(skillsText)));
                }

                mainPart.Document.Save();
            }

            return Result<ExportResult>.Success(new ExportResult
            {
                FileData = memStream.ToArray(),
                FileName = $"{resume.PersonalDetails.FirstName}_{resume.PersonalDetails.LastName}_Resume.docx",
                ContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            });
        }
        catch (Exception ex)
        {
            return Result<ExportResult>.Failure($"DOCX Export failed: {ex.Message}");
        }
    }

    private void AddSectionHeading(Body body, string text)
    {
        var para = body.AppendChild(new Paragraph());
        ApplyStyle(para, "Heading2");
        var run = para.AppendChild(new Run());
        run.AppendChild(new Text(text));
        
        // Add a bottom border/line
        var pPr = para.GetFirstChild<ParagraphProperties>() ?? para.PrependChild(new ParagraphProperties());
        var border = pPr.AppendChild(new ParagraphBorders());
        border.AppendChild(new BottomBorder { Val = BorderValues.Single, Size = 6, Space = 1, Color = "333333" });
    }

    private void SetTableWidth(Table table, string width)
    {
        TableProperties tblProp = new TableProperties(
            new TableWidth { Width = width, Type = TableWidthUnitValues.Pct },
            new TableBorders(
                new TopBorder { Val = BorderValues.None },
                new BottomBorder { Val = BorderValues.None },
                new LeftBorder { Val = BorderValues.None },
                new RightBorder { Val = BorderValues.None },
                new InsideHorizontalBorder { Val = BorderValues.None },
                new InsideVerticalBorder { Val = BorderValues.None }
            )
        );
        table.AppendChild(tblProp);
    }

    private void ApplyStyle(Paragraph para, string styleId)
    {
        var pPr = para.GetFirstChild<ParagraphProperties>() ?? para.PrependChild(new ParagraphProperties());
        pPr.AppendChild(new ParagraphStyleId { Val = styleId });
    }

    private void GenerateStyleDefinitionsPartContent(StyleDefinitionsPart styleDefinitionsPart)
    {
        Styles styles = new Styles();
        
        // Heading 1
        styles.Append(new Style {
            Type = StyleValues.Paragraph,
            StyleId = "Heading1",
            CustomStyle = true,
            StyleName = new StyleName { Val = "Heading 1" },
            StyleRunProperties = new StyleRunProperties(
                new RunFonts { Ascii = "Arial", HighAnsi = "Arial" },
                new Bold(),
                new FontSize { Val = "36" },
                new Color { Val = "000000" }
            )
        });

        // Heading 2
        styles.Append(new Style {
            Type = StyleValues.Paragraph,
            StyleId = "Heading2",
            CustomStyle = true,
            StyleName = new StyleName { Val = "Heading 2" },
            StyleRunProperties = new StyleRunProperties(
                new RunFonts { Ascii = "Arial", HighAnsi = "Arial" },
                new Bold(),
                new FontSize { Val = "24" },
                new Color { Val = "333333" }
            )
        });

        // Subtitle
        styles.Append(new Style {
            Type = StyleValues.Paragraph,
            StyleId = "Subtitle",
            CustomStyle = true,
            StyleName = new StyleName { Val = "Subtitle" },
            StyleRunProperties = new StyleRunProperties(
                new RunFonts { Ascii = "Arial", HighAnsi = "Arial" },
                new FontSize { Val = "22" },
                new Color { Val = "666666" }
            )
        });

        styleDefinitionsPart.Styles = styles;
    }
}

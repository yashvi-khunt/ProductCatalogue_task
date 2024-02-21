using Microsoft.EntityFrameworkCore.Metadata.Internal;
using ProductCatalogue.DTOs;
using ProductCatalogue.Models;
using ProductCatalogue.Repositories;
using ProductCatalogue.Services;
using System.Text;

namespace ProductCatalogue.Helper
{
    public class TemplateGenerator
    {
        public static string GetHTMLString(List<ProductListDTO> products)
        {

            var sb = new StringBuilder();
            sb.Append(@"
                        <html>
                            <head>
                            </head>
                            <body>
                                <h1 className=""text-4xl font-bold tracking-tight text-gray-900""> Product Catalogue </h1>
                              <div className=""m-4 flex flex-1 flex-wrap gap-x-8 gap-y-10 justify-center"">
                                ");
            foreach (var product in products)
            {
                sb.AppendFormat(@"
<div class=""w-max flex flex-col justify-center border-2 rounded-lg"">
    <div class=""w-full flex justify-center relative border-b-2 "">
        <img class=""h-80 rounded-sm"" src=""data:image/jpeg;base64,{0}"" /> <!-- Include the base64 string directly -->
        <div class=""absolute bottom-0 right-0 p-2"">
            <div class=""flex gap-1 cursor-pointer items-center "">
            </div>
        </div>
    </div>
    <div class=""flex flex-col gap-1 p-2"">
        <div class=""font-medium text-gray-400 text-sm"">Rs.{1}</div>
        <div class=""text-sm font-medium text-gray-600 hover:underline hover:cursor-pointer"">{2}</div>
    </div>
</div>", product.PrimaryImage
, product.Price, product.Name);
            }
            sb.Append(@"                
                                
                             </div>
                            </body>
                        </html>");
            return sb.ToString();
        }
    }
}


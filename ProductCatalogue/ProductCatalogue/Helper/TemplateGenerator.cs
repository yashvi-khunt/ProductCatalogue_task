using System.Collections.Generic;
using System.Text;
using ProductCatalogue.DTOs;

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
                    <link href=""https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"" rel=""stylesheet"">
                </head>
                <body>
                    <h1 class=""text-4xl font-bold tracking-tight text-gray-900""> Product Catalogue </h1>
                    <div class=""m-4 flex flex-1 flex-wrap gap-x-8 gap-y-10 justify-center"">
        ");

            foreach (var product in products)
            {
                sb.AppendFormat(@"
                <div class=""w-max flex flex-col justify-center border-2 rounded-lg"">
                    <div class=""w-full flex justify-center relative border-b-2 "">

                        <img class=""h-80 rounded-sm"" src=""{0}"" /> 
                        <div class=""absolute bottom-0 right-0 p-2"">
                            <div class=""flex gap-1 cursor-pointer items-center "">
                            </div>
                        </div>
                    </div>
                    <div class=""flex flex-col gap-1 p-2"">
                        <div class=""font-medium text-gray-400 text-sm"">Rs.{1}</div>
                        <div class=""text-sm font-medium text-gray-600 hover:underline hover:cursor-pointer""><a href=""http://localhost:5173/"" class=""hover:cursor-pointer"">{2}</a></div>
                    </div>
                </div>", product.PrimaryImage, product.Price, product.Name);
            }

            sb.Append(@"                
                    </div>
                </body>
            </html>");

            return sb.ToString();
        }
    }
}

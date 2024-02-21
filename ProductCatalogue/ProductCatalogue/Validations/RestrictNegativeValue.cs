using System.ComponentModel.DataAnnotations;

namespace ProductCatalogue.Validations
{
    public class RestrictNegativeValue : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null || string.IsNullOrEmpty(value.ToString()))
            {
                return ValidationResult.Success;
            }

            var result = Int32.Parse(value.ToString());
            if (result < 1)
            {
                return new ValidationResult("This field requires a positive value as input.");
            }
            return ValidationResult.Success;
        }
    }
}


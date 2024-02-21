using ProductCatalogue.DTOs;
using ProductCatalogue.Models;

namespace ProductCatalogue.Repositories
{
    public interface IAuth
    {
        string Login(User user);
        bool SignUp(User user);

    }
}

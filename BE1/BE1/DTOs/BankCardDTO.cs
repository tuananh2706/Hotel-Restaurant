using System;

namespace Hotel.DTOs
{
    public class BankCardDto
    {
        public int BankCardId { get; set; }
        public string AccountName { get; set; }
        public string CardNumber { get; set; }
        public DateOnly ExpirationDate { get; set; }
        public string CardType { get; set; }
    }
}

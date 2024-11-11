namespace Hotel.Request
{
    public class BankCardRequest
    {
        public class CreateBankCardRequest
        {
            public string AccountName { get; set; }
            public string CardNumber { get; set; }
            public DateOnly ExpirationDate { get; set; }
            public string CardType { get; set; }
        }

        public class UpdateBankCardRequest
        {
            public string? AccountName { get; set; }
            public string? CardNumber { get; set; }
            public DateOnly? ExpirationDate { get; set; }
            public string? CardType { get; set; }
        }
    }
}

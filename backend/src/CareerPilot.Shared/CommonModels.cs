namespace CareerPilot.Shared;

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public T Data { get; set; }
    public List<string> Errors { get; set; } = new();

    public static ApiResponse<T> SuccessResponse(T data, string message = "Success") => 
        new() { Success = true, Data = data, Message = message };

    public static ApiResponse<T> FailureResponse(string message, List<string> errors = null) => 
        new() { Success = false, Message = message, Errors = errors ?? new() };
}

public class Result
{
    public bool IsSuccess { get; }
    public string Message { get; }
    public List<string> Errors { get; }

    protected Result(bool isSuccess, string message, List<string> errors)
    {
        IsSuccess = isSuccess;
        Message = message;
        Errors = errors;
    }

    public static Result Success(string message = "") => new(true, message, new());
    public static Result Failure(string message, List<string> errors = null) => new(false, message, errors ?? new());
}

public class Result<T> : Result
{
    public T Value { get; }

    private Result(T value, bool isSuccess, string message, List<string> errors) 
        : base(isSuccess, message, errors)
    {
        Value = value;
    }

    public static Result<T> Success(T value, string message = "") => new(value, true, message, new());
    public static new Result<T> Failure(string message, List<string> errors = null) => new(default, false, message, errors ?? new());
}

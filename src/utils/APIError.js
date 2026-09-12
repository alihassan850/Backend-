class APIError extends Error{
    constructor(
        statuscode,
        message= "Something is wrong",
        errors= [],
        statck= ""
    ){
        super(message)
        this.statuscode = statuscode
        this.data = null
        this.message = message
        this.succuss = false
        this.errors  = errors
    }
}

export { APIError }
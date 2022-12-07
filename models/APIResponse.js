class APIResponse {
    constructor(status, message, data, timeExec = -1) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.timeExec = timeExec;
    }
}

module.exports = APIResponse

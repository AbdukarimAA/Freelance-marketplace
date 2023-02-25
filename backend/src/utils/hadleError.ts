interface IError {
    status?: any
}

export const createError = (status: any, message: any) => {
    const err = new Error();
    (err as IError).status = status;
    err.message = message;

    return err;
};
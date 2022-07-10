enum StatusCodes {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  UnprocessableEntity = 422,
  InternalServerError = 500,
}

type err = {
  type:
    | "BadRequestError"
    | "UnauthorizedError"
    | "NotFoundError"
    | "ForbiddenError"
    | "UnprocessableEntityError"
    | "InternalServerError";
  message?: string;
};

type errorDetails = {
  statusCode: StatusCodes;
  message: string;
};

export function errorDetailsGenerator(err: any): errorDetails {
  const errorDetails = {
    BadRequestError: {
      statusCode: StatusCodes.BadRequest,
      message: err.message || "Bad Request",
    },
    UnauthorizedError: {
      statusCode: StatusCodes.Unauthorized,
      message: err.message || "Unauthorized",
    },
    ForbiddenError: {
      statusCode: StatusCodes.Forbidden,
      message: err.message || "Forbidden",
    },
    NotFoundError: {
      statusCode: StatusCodes.NotFound,
      message: err.message || "Not Found",
    },
    InternalServerError: {
      statusCode: StatusCodes.InternalServerError,
      message: err.message || "An internal error has occurred",
    },
  };

  return isDetailError(err)
    ? err
    : errorDetails[err.type] || errorDetails["InternalServerError"];
}

export function generateError(err: err): errorDetails {
  return errorDetailsGenerator(err);
}

function isDetailError(err: any) {
  return err.statusCode && err.message;
}

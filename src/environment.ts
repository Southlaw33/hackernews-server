//this is just to create a jwtsecretkey access accross the project
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || process.exit(1);

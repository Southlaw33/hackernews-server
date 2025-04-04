//this is just to create a jwtsecretkey access accross the project
export const jwtSecretKey = process.env.jwtSecretKey || process.exit(1);

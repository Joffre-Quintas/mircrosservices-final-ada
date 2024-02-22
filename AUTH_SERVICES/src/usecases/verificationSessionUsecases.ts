import jwt from 'jsonwebtoken'
import CustomException from '../exceptions'


class VerificationSessionUsecases {
    static async verification(token: string) {
        try {
            if (typeof token !== 'string' || !token) {
                console.log(token);
                throw new CustomException(401, 'Token not provided or not a string');
            }

            const tokenValid = jwt.verify(token, process.env.SECRET as string);
            return !!tokenValid;

        } catch (error) {
            console.log(error);
            if (error instanceof jwt.JsonWebTokenError) {
                throw new CustomException(401, 'Invalid token');
            } else {
                throw new CustomException(500, 'Server Error');
            }
        }
    }
}

export default VerificationSessionUsecases
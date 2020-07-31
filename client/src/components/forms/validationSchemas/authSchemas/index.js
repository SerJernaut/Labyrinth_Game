import * as Yup from 'yup';

const NICKNAME_NAME_PATTERN = /^[A-Z][a-zA-Z0-9]{1,16}$/;
const PASSWORD_PATTERN =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const NICKNAME_PATTERN_MESSAGE = 'Nickname must starts from latin capital letter, contains at least one lowercase letter and be no longer than 16 characters';
const PASSWORD_PATTERN_MESSAGE = 'Password must contains minimum eight latin characters, at least one letter and one number';


const nickName = {nickName: Yup.string().label('Nick Name').matches(NICKNAME_NAME_PATTERN, NICKNAME_PATTERN_MESSAGE).required()};
const password = {password: Yup.string().matches(PASSWORD_PATTERN, PASSWORD_PATTERN_MESSAGE).required()};

const authValidationSchema = Yup.object( {
    ...nickName,
    ...password
} );

export default authValidationSchema;
import * as Yup from 'yup';

const NICKNAME_NAME_PATTERN = /^[A-Z][a-zA-Z0-9]{1,16}$/;
const PASSWORD_PATTERN =  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)[A-Za-z0-9_@#%!?\-^]{8,16}$/;

const NICKNAME_PATTERN_MESSAGE = 'Enter the valid nickname';
const PASSWORD_PATTERN_MESSAGE = 'Enter the valid password';


const nickName = {nickName: Yup.string().label('Nick Name').matches(NICKNAME_NAME_PATTERN, NICKNAME_PATTERN_MESSAGE).required()};
const password = {password: Yup.string().matches(PASSWORD_PATTERN, PASSWORD_PATTERN_MESSAGE).required()};

const authValidationSchema = Yup.object( {
    ...nickName,
    ...password
} );

export default authValidationSchema;
import * as Yup from 'yup';

const maxPlayers = {maxPlayers: Yup.number().required()};
const areaSize = {areaSize: Yup.mixed().oneOf([9, 16, 25]).required()};

const gameRoomCreationSchema = Yup.object( {
    ...maxPlayers,
    ...areaSize
} );

export default gameRoomCreationSchema;
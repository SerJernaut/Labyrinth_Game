const inputStyles = {
    padding: '10px 0',
    background: 'lightgrey',
    textAlign: 'center',
    fontWeight: '900'
};

const labelStyles = {
    maxWidth:  '50%',
    textAlign: 'center',
    marginBottom: '20px'
};

const FIELDS = {
   authFields: [
        {
            name: 'nickName',
            type: 'text',
            placeholder: 'NickName',
        },
        {
            name: 'password',
            type: 'password',
            placeholder: 'Password',
        }
        ],
    gameCreationFields: [
           {
               name: 'maxPlayers',
               type: 'text',
               placeholder: 'Max players',
               isDisabled: true,
               labelText: 'Max players:',
               inputStyles: inputStyles,
               labelStyles: labelStyles
           },
           {
                name: 'areaSize',
                type: 'text',
                placeholder: 'Area Size',
                isDisabled: true,
                labelText: 'Area size:',
               inputStyles: inputStyles,
               labelStyles: labelStyles
           }

    ]

}

export default FIELDS;
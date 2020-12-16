module.exports = {
    root: true,
    extends: [
        '@react-native-community',
        'airbnb-typescript',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react'
    ],
    parserOptions: {
        project: './tsconfig.json',
        createDefaultProgram: true
    },
    rules: {
        'react/jsx-props-no-spreading': 'off'
    }
};

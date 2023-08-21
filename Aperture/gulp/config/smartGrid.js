import smartGrid from "smart-grid"

const settings = {
    columns: 12,
    offset: '15px',
    wrapper: {
        maxWidth: '1400px',
        fields: '30px',
    },
    breakPoints: {
        md: {
            width: "992px",
            fields: "20px"
        },
        sm: {
            width: "720px",
            fields: "10px"
        },
        xs: {
            width: "576px",
            fields: "5px"
        },
        xss: {
            width: "380px",
            fields: "5px"
        },
    },
    oldSizeStyle: false,
    properties: []
};

smartGrid(`../../src/smart`, settings);
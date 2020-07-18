const headingBase = {
  fontFamily: 'heading',
  lineHeight: 'heading',
  fontWeight: 'heading',
  mt: 0,
  mb: 3,
  '::before': {
    content: '" "',
    display: 'block',
    paddingTop: 10, // titghten these up: 30->10
    marginBottom: 20, // titghten these up: 40->20
    borderBottom: '1px solid',
    borderBottomColor: 'borderColor'
  }
};

export default {
  h1: {
    ...headingBase,
    fontSize: 5
  },
  h2: {
    ...headingBase,
    fontSize: 4
  },
  h3: {
    ...headingBase,
    fontSize: 3
  },
  h4: {
    ...headingBase,
    fontSize: 2
  },
  h5: {
    ...headingBase,
    fontSize: 1
  },
  h6: {
    ...headingBase,
    fontSize: 0
  }
};

const localUrl = 'mongodb://localhost:27017/mongoDBlocal';
const atlasUrl = 'mongodb+srv://usuarioPrueba:AxXdfs4crE2qZQs@cluster0.ez0kn.mongodb.net/ecommerce-atlas?retryWrites=true&w=majority';
const config = {
	localUrl,
	atlasUrl,
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
};


export default config;

import httpClient from './httpClient';

const END_POINT = '/type'

const getAllTypes = () => httpClient.get(`${END_POINT}?limit=20`);

const getType = (type_id) => httpClient.get(`${END_POINT}/${type_id}`);

export {
	getAllTypes,
	getType
}
import httpClient from './httpClient';

const END_POINT = '/region'

const getAllRegions = () => httpClient.get(`${END_POINT}?limit=8`);

const getRegion = (region_id) => httpClient.get(`${END_POINT}/${region_id}`);

export {
	getAllRegions,
	getRegion
}
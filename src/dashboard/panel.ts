import type NodeCG from '@nodecg/types';
import type { SpeedruncomReplicant } from '../types/schemas/';

const gameNameElem = document.getElementById('game') as HTMLInputElement
const categoryNameElem = document.getElementById('category') as HTMLInputElement;
const resultElem = document.getElementById('result')!;
const updateBtnElem = document.getElementById('update') as HTMLButtonElement;

const speedruncomReplicant = nodecg.Replicant('speedruncomReplicant') as unknown as NodeCG.ServerReplicantWithSchemaDefault<SpeedruncomReplicant>;

speedruncomReplicant.on('change', () => {
	resultElem.innerText = speedruncomReplicant.value.categoryName + ": " + speedruncomReplicant.value.completeTime
})

updateBtnElem.addEventListener('click', ()=> {
	if (gameNameElem.value === '' || categoryNameElem.value === '') {
		resultElem.innerText = 'ERR!: type game id and category'
	}
	else {
		nodecg.log.info(gameNameElem.value);
		nodecg.log.info(categoryNameElem.value);

		speedruncomReplicant.value.gameName = gameNameElem.value
		speedruncomReplicant.value.categoryName = categoryNameElem.value
	}	
})


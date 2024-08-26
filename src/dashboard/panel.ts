import type NodeCG from '@nodecg/types';
import type { Speedruncom } from '../types/schemas/';

const gameNameElem = document.getElementById('game') as HTMLInputElement
const categoryNameElem = document.getElementById('category') as HTMLInputElement;
const resultElem = document.getElementById('result')!;
const updateBtnElem = document.getElementById('update') as HTMLButtonElement;

const speedruncomRep = nodecg.Replicant('speedruncom') as unknown as NodeCG.ServerReplicantWithSchemaDefault<Speedruncom>;

nodecg.listenFor('finishUpdateSrcValue', () => {
	setTimeout(function() {
		resultElem.innerText = speedruncomRep.value.categoryName + ": " + speedruncomRep.value.completeTime;
	}, 50);
});

updateBtnElem.addEventListener('click', ()=> {
	if (gameNameElem.value === '' || categoryNameElem.value === '') {
		resultElem.innerText = 'ERR!: type game id and category';
	}
	else {
		speedruncomRep.value.gameName = gameNameElem.value;
		speedruncomRep.value.categoryName = categoryNameElem.value;

		setTimeout(function() {
			nodecg.sendMessage("updateSrcValue");
		}, 50);
	};	
});
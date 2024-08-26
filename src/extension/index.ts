import type NodeCG from '@nodecg/types';
import type { Speedruncom } from '../types/schemas';
import { formatTime } from './util/format';

module.exports = function (nodecg: NodeCG.ServerAPI) {

	const speedruncomRep = nodecg.Replicant('speedruncom') as unknown as NodeCG.ServerReplicantWithSchemaDefault<Speedruncom>;
	
  async function fetchSpeedrunComData() {
		await fetch(
      'https://www.speedrun.com/api/v1/leaderboards/'
      + speedruncomRep.value.gameName
      + '/category/' + speedruncomRep.value.categoryName.split(' ').join('_')
      + '?embed=players&top=1'
    )
    .then(async response => response.json())
    .then(async apiData => {
      const runData = apiData.data
      const formattedTime:string = formatTime(runData.runs[0].run.times.primary_t)
			speedruncomRep.value.completeTime = formattedTime
    });
    nodecg.log.info(speedruncomRep.value.gameName + " - " + speedruncomRep.value.categoryName + ": " + speedruncomRep.value.completeTime)
    nodecg.sendMessage('finishUpdateSrcValue')
    };

  nodecg.listenFor('updateSrcValue', () => {
    void fetchSpeedrunComData()
  });

}
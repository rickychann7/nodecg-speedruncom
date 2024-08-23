import type NodeCG from '@nodecg/types';
import type { SpeedruncomReplicant } from '../types/schemas';
import { formatTime } from './util/format';

module.exports = function (nodecg: NodeCG.ServerAPI) {

	const speedruncomReplicant = nodecg.Replicant('speedruncomReplicant') as unknown as NodeCG.ServerReplicantWithSchemaDefault<SpeedruncomReplicant>;
	
  async function fetchSpeedrunComData() {
		void fetch(
      'https://www.speedrun.com/api/v1/leaderboards/'
      + speedruncomReplicant.value.gameName
      + '/category/' + speedruncomReplicant.value.categoryName.split(' ').join('_')
      + '?embed=players&top=1'
    )
    .then(async response => response.json())
    .then(apiData => {
      const runData = apiData.data
      const formattedTime:string = formatTime(runData.runs[0].run.times.primary_t)

			speedruncomReplicant.value.completeTime = formattedTime

      // nodecg.log.info(runData)
			nodecg.log.info(speedruncomReplicant.value.categoryName + ": " + speedruncomReplicant.value.completeTime)
      }
    )}

  speedruncomReplicant.on('change', () => {
		void fetchSpeedrunComData()
  })

}
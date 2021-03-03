const sinon = require('sinon')
import * as T from '../src/types'
import path from 'path'

import { Orchestrator, Config } from '../src'
import { spawnTest } from '../src/config'

export const testOrchestrator = () => new Orchestrator({
  mode: {
    executor: 'none',
    spawning: 'local',
  }
})

export const testConfig = (dnaPath: string) => {
  const seed: T.ConfigSeed = Config.gen({
    network: {
      transport_pool: [{
        type: T.TransportConfigType.Quic,
      }],
    }},
  )
  const install: T.InstallAgentsHapps = [
    // agent 0
    [
      // happ 0
      [dnaPath]
    ]
  ]
  return [seed, install]
}

export const withClock = f => t => {
  const clock = sinon.useFakeTimers()
  try {
    f(t, clock)
  } finally {
    clock.runAll()
    clock.restore()
  }
}

export const genConfigArgs: () => Promise<T.RawConductorConfig> = async () => ({
  environment_path: '/tmp',//path.join(__dirname, 'tmp'),
  keystore_path: path.dirname('/tmp/keystore'),
  admin_interfaces: [
    {
      driver: {
        type: 'websocket',
        port: 1000,
      },
    },
  ],
  app_interfaces: [
    {
      driver: {
        type: 'websocket',
        port: 0,
      },
    },
  ],
  // configDir: './tmp',
  // adminInterfacePort: 1000,
  // appInterfacePort: 0,
  // playerName: 'playerName',
  // scenarioName: 'scenarioName',
  // uuid: 'uuid',
})
export const spawnConductor = (() => { }) as unknown as T.SpawnConductorFn

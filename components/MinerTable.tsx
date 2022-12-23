import styles from '@pages/table.module.scss';

import * as React from 'react';
import * as C from '@common/constants';
import * as U from '@common/utilities';

export default class MinerTable extends React.Component<any> {
  static defaultProps = {
    miners: [],
  };

  render() {
    return (
      <React.Fragment>
        <table className={styles.table} style={this.props.style}>
          <tbody className={styles.tbody}>
            <tr className={styles.tr}>
              <th className={styles.th}>Provider ({this.props.miners.length})</th>
              <th className={styles.th}>Total</th>
              <th className={styles.th}>Confirmed</th>
              <th className={styles.th}>Failed</th>
              <th className={styles.th}>Faults</th>
            </tr>
            {this.props.miners.map((miner, index) => {
              if (miner.suspended) {
                return null;
              }

              return (
                <tr className={styles.tr} key={`${miner.miner}-${index}`}>
                  <td className={styles.tdcta}>
                    <a className={styles.cta} href={`/providers/stats/${miner.addr}`}>
                      {miner.addr} {!U.isEmpty(miner.name) ? `(${miner.name})` : ''}
                    </a>
                  </td>

                  {miner.totalDeals ? (
                    <td className={styles.tdcta}>
                      <a className={styles.cta} href={`/providers/deals/${miner.addr}`}>
                        {miner.totalDeals} deals
                      </a>
                    </td>
                  ) : (
                    <td className={styles.td} />
                  )}
                  {miner.confirmedDeals ? <td className={styles.td}>{miner.confirmedDeals} deals</td> : <td className={styles.td} />}
                  {miner.failedDeals ? (
                    <td className={styles.tdcta}>
                      <a className={styles.cta} href={`/providers/errors/${miner.addr}`} target="_blank">
                        {miner.failedDeals} deals
                      </a>
                    </td>
                  ) : (
                    <td className={styles.td} />
                  )}
                  {miner.dealFaults ? <td className={styles.td}>{miner.dealFaults} times</td> : <td className={styles.td} />}
                </tr>
              );
            })}
          </tbody>
        </table>
        <table className={styles.table}>
          <tbody className={styles.tbody}>
            <tr className={styles.tr}>
              <th className={styles.th} style={{ width: '132px' }}>
                Storage provider
              </th>
              <th className={styles.th}>Suspension reason</th>
            </tr>
            {this.props.miners.map((miner, index) => {
              if (!miner.suspended) {
                return null;
              }

              let suspended = {
                background: `var(--status-error)`,
                color: `var(--main-background-input)`,
              };

              return (
                <tr className={styles.tr} key={`${miner.miner}-${index}`} style={suspended}>
                  <td className={styles.tdcta}>
                    <a className={styles.cta} href={`/providers/stats/${miner.addr}`}>
                      {miner.addr}
                    </a>
                  </td>
                  <td className={styles.td} style={suspended}>
                    {miner.suspendedReason}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

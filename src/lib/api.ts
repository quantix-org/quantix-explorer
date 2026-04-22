const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.qpqb.org';

async function fetchAPI(endpoint: string) {
  const res = await fetch(`${RPC_URL}${endpoint}`, {
    next: { revalidate: 10 },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// Stats
export async function getStats() {
  try {
    const info = await fetchAPI('/chain/info');
    return {
      blockHeight: info.height || 0,
      totalTxs: (info.height || 0) * 10, // estimate based on blocks
      validators: info.validators || 0,
      totalStaked: info.total_supply_nqtx || '0',
      avgBlockTime: 10,
      tps: info.tps || 0,
    };
  } catch {
    return {
      blockHeight: 0,
      totalTxs: 0,
      validators: 0,
      totalStaked: '0',
      avgBlockTime: 0,
      tps: 0,
    };
  }
}

// Blocks
export async function getBlocks(limit = 10, offset = 0) {
  try {
    const info = await fetchAPI('/chain/info');
    const latest = info.height || 0;
    const blocks = [];
    
    for (let i = 0; i < limit; i++) {
      const num = latest - offset - i;
      if (num < 0) break;
      
      try {
        const data = await fetchAPI(`/block/height/${num}`);
        if (data.header || data.block) {
          const block = data.block || data;
          const header = block.header || block;
          blocks.push({
            number: header.height ?? num,
            hash: header.hash || '',
            parentHash: header.parent_hash || '',
            timestamp: header.timestamp ? new Date(header.timestamp * 1000).toISOString() : new Date().toISOString(),
            validator: header.miner || header.proposer_id || '',
            txCount: block.body?.txs_list?.length || header.tx_count || 0,
            gasUsed: header.gas_used || 0,
            gasLimit: header.gas_limit || 0,
            stateRoot: header.state_root || '',
          });
        }
      } catch (e) {
        // Skip blocks that can't be fetched
      }
    }
    return blocks;
  } catch {
    return [];
  }
}

export async function getBlock(id: string) {
  try {
    // Try by height first if it's a number
    const isNum = /^\d+$/.test(id);
    const endpoint = isNum ? `/block/height/${id}` : `/block/${id}`;
    const data = await fetchAPI(endpoint);
    
    if (!data || data.error) return null;
    
    const block = data.block || data;
    const header = block.header || block;
    
    return {
      number: header.height ?? (parseInt(id) || 0),
      hash: header.hash || '',
      parentHash: header.parent_hash || '',
      timestamp: header.timestamp ? new Date(header.timestamp * 1000).toISOString() : new Date().toISOString(),
      validator: header.miner || header.proposer_id || '',
      txCount: block.body?.txs_list?.length || header.tx_count || 0,
      gasUsed: header.gas_used || 0,
      gasLimit: header.gas_limit || 0,
      stateRoot: header.state_root || '',
    };
  } catch {
    return null;
  }
}

// Transactions
export async function getTransactions(limit = 10, offset = 0) {
  try {
    const mempool = await fetchAPI('/mempool');
    const txs = (mempool.pending_txs || []).slice(offset, offset + limit).map((tx: any) => ({
      hash: tx.id || tx.hash || '',
      blockNumber: 0, // pending
      from: tx.sender || '',
      to: tx.receiver || '',
      value: tx.amount?.toString() || '0',
      fee: '21000000000000',
      gasUsed: tx.gas_limit || 21000,
      nonce: tx.nonce || 0,
      status: 'pending',
      timestamp: tx.timestamp ? new Date(tx.timestamp * 1000).toISOString() : new Date().toISOString(),
    }));
    return txs;
  } catch {
    return [];
  }
}

export async function getTransaction(hash: string) {
  try {
    const data = await fetchAPI(`/transaction/${hash}`);
    if (!data || data.error) return null;
    
    const tx = data.transaction || data;
    return {
      hash: tx.id || tx.hash || hash,
      blockNumber: tx.block_number || 0,
      from: tx.sender || '',
      to: tx.receiver || '',
      value: tx.amount?.toString() || '0',
      fee: '21000000000000',
      gasUsed: tx.gas_limit || 21000,
      nonce: tx.nonce || 0,
      status: tx.status || 'success',
      timestamp: tx.timestamp ? new Date(tx.timestamp * 1000).toISOString() : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

// Address
export async function getAddress(address: string) {
  try {
    const data = await fetchAPI(`/balance/${address}`);
    return {
      address,
      balance: data.balance_nqtx || '0',
      txCount: data.nonce || 0,
      isContract: false,
      isValidator: address.includes('validator'),
    };
  } catch {
    return {
      address,
      balance: '0',
      txCount: 0,
      isContract: false,
      isValidator: false,
    };
  }
}

export async function getAddressTransactions(address: string, limit = 25) {
  try {
    const data = await fetchAPI(`/accounts/${address}/txs`);
    const txs = (data.transactions || []).slice(0, limit).map((tx: any) => ({
      hash: tx.id || tx.hash || '',
      blockNumber: tx.block_number || 0,
      from: tx.sender || '',
      to: tx.receiver || '',
      value: tx.amount?.toString() || '0',
      fee: '21000000000000',
      gasUsed: tx.gas_limit || 21000,
      nonce: tx.nonce || 0,
      status: tx.status || 'success',
      timestamp: tx.timestamp ? new Date(tx.timestamp * 1000).toISOString() : new Date().toISOString(),
    }));
    return txs;
  } catch {
    return [];
  }
}

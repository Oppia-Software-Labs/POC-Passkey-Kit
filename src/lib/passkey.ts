import { PasskeyKit, PasskeyServer, SACClient } from "passkey-kit";
import { Account, Keypair, StrKey } from "@stellar/stellar-sdk/minimal";
import { Buffer } from "buffer";
import { basicNodeSigner } from "@stellar/stellar-sdk/minimal/contract";
import { Server } from "@stellar/stellar-sdk/minimal/rpc";

// Variables de entorno Next.js con valores por defecto
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "https://soroban-testnet.stellar.org";
const networkPassphrase = process.env.NEXT_PUBLIC_NETWORK_PASSPHRASE || "Test SDF Network ; September 2015";
const walletWasmHash = process.env.NEXT_PUBLIC_WALLET_WASM_HASH || "default-wasm-hash";
const launchtubeUrl = process.env.NEXT_PUBLIC_LAUNCHTUBE_URL || "https://launchtube.stellar.org";
const launchtubeJwt = process.env.NEXT_PUBLIC_LAUNCHTUBE_JWT || "default-jwt";
const mercuryProjectName = process.env.NEXT_PUBLIC_MERCURY_PROJECT_NAME || "default-project";
const mercuryUrl = process.env.NEXT_PUBLIC_MERCURY_URL || "https://mercury.stellar.org";
const mercuryJwt = process.env.NEXT_PUBLIC_MERCURY_JWT || "default-jwt";
const nativeContractId = process.env.NEXT_PUBLIC_NATIVE_CONTRACT_ID || "default-contract-id";

export const rpc = new Server(rpcUrl);

export const mockPubkey = StrKey.encodeEd25519PublicKey(Buffer.alloc(32));
export const mockSource = new Account(mockPubkey, "0");

// Función para crear el keypair solo cuando sea necesario
export async function createFundKeypair(): Promise<Keypair> {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  const nowData = new TextEncoder().encode(now.getTime().toString());
  const hashBuffer = await crypto.subtle.digest("SHA-256", nowData);
  const keypair = Keypair.fromRawEd25519Seed(Buffer.from(hashBuffer));
  const publicKey = keypair.publicKey();
  try {
    await rpc.getAccount(publicKey);
  } catch {
    try {
      await rpc.requestAirdrop(publicKey);
    } catch {}
  }
  return keypair;
}

// Helpers asíncronos para obtener pubkey y signer
export async function getFundPubkey() {
  const keypair = await createFundKeypair();
  return keypair.publicKey();
}

export async function getFundSigner() {
  const keypair = await createFundKeypair();
  return basicNodeSigner(keypair, networkPassphrase);
}

// Configuración de PasskeyKit con manejo de errores
export const account = new PasskeyKit({
  rpcUrl,
  networkPassphrase,
  walletWasmHash,
});

export const server = new PasskeyServer({
  rpcUrl,
  launchtubeUrl,
  launchtubeJwt,
  mercuryProjectName,
  mercuryUrl,
  mercuryJwt,
});

export const sac = new SACClient({
  rpcUrl,
  networkPassphrase,
});

export const native = sac.getSACClient(nativeContractId);

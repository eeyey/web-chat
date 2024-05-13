import { Socket } from '../models/Socket/Socket';

const wsUrl = process.env.REACT_APP_SOCKET_URL ?? '';

export const socket = new Socket(wsUrl);

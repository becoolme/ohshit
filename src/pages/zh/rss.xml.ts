import type { APIRoute } from 'astro';
import { incidentFeed } from '../../lib/feed';

export const GET: APIRoute = ({ site }) => incidentFeed('zh', site!);

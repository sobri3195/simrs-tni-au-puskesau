import { NextRequest, NextResponse } from 'next/server';

async function proxy(request: NextRequest, path: string[]) {
  const target = process.env.API_PROXY_TARGET_URL;
  const token = process.env.API_PROXY_SERVICE_TOKEN;

  if (!target || !token) {
    return NextResponse.json({ error: 'Proxy env belum lengkap' }, { status: 500 });
  }

  const url = `${target}/${path.join('/')}${request.nextUrl.search}`;
  const response = await fetch(url, {
    method: request.method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : await request.text()
  });

  const data = await response.text();
  return new NextResponse(data, {
    status: response.status,
    headers: { 'Content-Type': response.headers.get('Content-Type') ?? 'application/json' }
  });
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return proxy(request, path);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return proxy(request, path);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return proxy(request, path);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  return proxy(request, path);
}

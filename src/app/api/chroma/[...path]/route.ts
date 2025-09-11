import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const params = await context.params;
  try {
    const { searchParams } = new URL(request.url);
    const chromaHost = searchParams.get('host') || '3.6.132.24';
    const chromaPort = searchParams.get('port') || '8000';
    
    const path = params.path.join('/');
    const chromaUrl = `http://${chromaHost}:${chromaPort}/${path}`;
    
    console.log(`Proxying GET request to: ${chromaUrl}`);
    
    const response = await fetch(chromaUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  const params = await context.params;
  try {
    const { searchParams } = new URL(request.url);
    const chromaHost = searchParams.get('host') || '3.6.132.24';
    const chromaPort = searchParams.get('port') || '8000';
    
    const path = params.path.join('/');
    const chromaUrl = `http://${chromaHost}:${chromaPort}/${path}`;
    
    const body = await request.json();
    
    console.log(`Proxying POST request to: ${chromaUrl}`);
    console.log('Request body:', body);
    
    const response = await fetch(chromaUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  const params = await context.params;
  try {
    const { searchParams } = new URL(request.url);
    const chromaHost = searchParams.get('host') || '3.6.132.24';
    const chromaPort = searchParams.get('port') || '8000';
    
    const path = params.path.join('/');
    const chromaUrl = `http://${chromaHost}:${chromaPort}/${path}`;
    
    console.log(`Proxying DELETE request to: ${chromaUrl}`);
    
    const response = await fetch(chromaUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    // Handle empty response for DELETE requests
    let data = {};
    try {
      data = await response.json();
    } catch {
      // DELETE requests might return empty responses
      data = { success: true };
    }
    
    return NextResponse.json(data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (error) {
    console.error('Proxy DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy DELETE request' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\LogRequest;

class LogRequestMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $logRequest = new LogRequest();
        $logRequest->method = $request->method();
        $logRequest->endpoint = $request->path();
        $logRequest->reqbody = is_null($request->getContent()) ? "{}" : $request->getContent();

        $response = $next($request);

        $logRequest->resbody = is_null($response->getContent()) ? "{}" : $response->getContent();
        $logRequest->resstatus = $response->getStatusCode();
        $logRequest->save();

        return $response;
    }
}

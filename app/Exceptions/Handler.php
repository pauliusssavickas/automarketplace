<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Throwable $exception)
    {
        // Check if the request expects a JSON response (for API routes)
        if ($request->expectsJson()) {
            
            // Handle ModelNotFoundException (e.g., for models like VehicleType)
            if ($exception instanceof ModelNotFoundException) {
                return response()->json([
                    'error' => 'Resource not found'
                ], 404);
            }

            // Handle other NotFoundHttpException (e.g., when route does not exist)
            if ($exception instanceof NotFoundHttpException) {
                return response()->json([
                    'error' => 'Not Found'
                ], 404);
            }

            // Handle other general exceptions
            return response()->json([
                'error' => $exception->getMessage(),
            ], $exception->getCode() ?: 500);
        }

        // Use the default behavior for non-API requests (like HTML responses)
        return parent::render($request, $exception);
    }
}

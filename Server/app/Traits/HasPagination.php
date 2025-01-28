<?php

namespace App\Traits;


trait HasPagination
{
    protected function getPaginationParams()
    {
        return [
            'page' => request()->input('page', 1),
            'per_page' => request()->input('per_page', 10),
        ];
    }

    protected function paginationResponse($data)
    {
        return [
            'data' => $data->items(),
            'current_page' => $data->currentPage(),
            'next_page' => $data->hasMorePages() ? $data->currentPage() + 1 : null,
            'total' => $data->total(),
            'per_page' => $data->perPage(),
        ];
    }
}

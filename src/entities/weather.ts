export interface WeatherData {
    name: string;
    main: {
        temp: number;
    };
    weather: Array<{
        icon: string;
    }>;
    wind: {
        speed: number;
    };
}

export interface WeatherApiResponse {
    name: string;
    main: {
        temp: number;
    };
    weather: Array<{
        icon: string;
    }>;
    wind: {
        speed: number;
    };
}

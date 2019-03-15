export interface LoggingConfig {
    Listeners: ListenerConfig[];
    Loggers: LoggerConfig[];

}

export interface ListenerConfig {
    Name: string;
    Type: string;
    Format: string;
    ListenerConfig: any | undefined;
}

export interface LoggerConfig {
    Name: string;
    Listeners: string[]
}   
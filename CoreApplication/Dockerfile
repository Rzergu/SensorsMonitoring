FROM lieznovskiy/netcore3.0_node:0.0.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /src
COPY ["EdgePipeline/IoTMonitoring.csproj", "EdgePipeline/"]
RUN dotnet restore "EdgePipeline/IoTMonitoring.csproj"
COPY . .
WORKDIR "/src/EdgePipeline"
RUN dotnet build "IoTMonitoring.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "IoTMonitoring.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IoTMonitoring.dll"]
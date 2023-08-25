﻿// <auto-generated />
using System;
using IoTMonitoring.Data.Data.Things;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace IoTMonitoring.Data.Migrations
{
    [DbContext(typeof(ThingsContext))]
    [Migration("20201010202215_ChangeSensData")]
    partial class ChangeSensData
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("EdgePipeline.Core.Entities.SensorAggregate.Sensor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("ThingId")
                        .HasColumnType("integer");

                    b.Property<int>("Type")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ThingId");

                    b.ToTable("Sensors");
                });

            modelBuilder.Entity("IoTMonitoring.Core.Entities.SensorValueAggregate.SensorValue", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("FreqValuesJson")
                        .HasColumnType("text");

                    b.Property<int>("SensorId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("SensorId");

                    b.ToTable("SensorValue");
                });

            modelBuilder.Entity("IoTMonitoring.Core.Entities.ThingAggregate.Thing", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Things");
                });

            modelBuilder.Entity("EdgePipeline.Core.Entities.SensorAggregate.Sensor", b =>
                {
                    b.HasOne("IoTMonitoring.Core.Entities.ThingAggregate.Thing", "Thing")
                        .WithMany("Sensors")
                        .HasForeignKey("ThingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("IoTMonitoring.Core.Entities.SensorValueAggregate.SensorValue", b =>
                {
                    b.HasOne("EdgePipeline.Core.Entities.SensorAggregate.Sensor", "Sensor")
                        .WithMany("SensorsValues")
                        .HasForeignKey("SensorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}

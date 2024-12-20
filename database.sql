-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 20, 2024 at 06:44 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `automarket`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `listing_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `content`, `user_id`, `listing_id`, `created_at`, `updated_at`) VALUES
(1, 'Damnnn this is an amazing car', 2, 5, '2024-12-12 22:08:04', '2024-12-12 22:08:04'),
(2, 'please don\'t hit a crowd on the way out', 2, 6, '2024-12-12 22:08:22', '2024-12-12 22:08:22'),
(3, '$2000 and I take it off your hands', 2, 7, '2024-12-12 22:08:55', '2024-12-12 22:08:55'),
(4, '$200, aint gettin more buddy', 5, 14, '2024-12-13 03:58:25', '2024-12-13 03:58:25'),
(5, 'selling cause it\'s in at the mechanics shop all the time? hahahah', 5, 6, '2024-12-13 03:59:30', '2024-12-13 03:59:30'),
(6, 'This is a test comment, edited', 1, 19, '2024-12-20 03:10:47', '2024-12-20 03:11:50');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `listings`
--

CREATE TABLE `listings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `vehicle_type_id` bigint(20) UNSIGNED NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`)),
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `price` int(11) DEFAULT NULL,
  `contact_number` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `listings`
--

INSERT INTO `listings` (`id`, `vehicle_type_id`, `data`, `user_id`, `price`, `contact_number`, `description`, `created_at`, `updated_at`) VALUES
(5, 1, '{\"make\":\"Mercedes-Benz\",\"model\":\"G63 AMG\",\"Fuel\":\"Petrol\",\"Engine Size\":\"5.5 L\",\"Year\":\"2017\",\"Power\":\"542 KW\",\"Seats\":\"5\"}', 1, 75000, '68415224', 'NEW Facelift LOOK Body-KIT\r\n\r\nComplete official service history of Mercedes-Benz dealerships:\r\n- 09.2013 / 17,500 km (Silberauto)\r\n- 09.2014 / 35,500 km (Silver car)\r\n- 08.2015 / 52,200 km (Silberauto)\r\n- 08.2016 / 65,400 km (Silberauto)\r\n- 08.2017 / 82,700 km (Silver car)\r\n- 08.2018 / 100,500 km (Silberauto)\r\n- 09.2019 / 109,500 km (Silver car)\r\n- 09.2020 / 120,000 km (Veho)\r\n- 09.2021 / 134,000 km (Veho)\r\n- 10.2022 / 140,100 km (Veho)\r\n- 06.2023 / 145,000 km (Krown Eesti Corrosion treatment)\r\n- 10.2023 / 148,500 km (Veho)\r\n\r\nThe vehicle comes with two sets of wheels:\r\n- 22\" Vossen rims with Michelin summer tires\r\n- Michelin studded tires on 20\" AMG rims\r\n\r\nThe car is covered with TAC-Systems ceramic wax + protective film', '2024-12-12 21:37:08', '2024-12-12 21:37:08'),
(6, 1, '{\"make\":\"Ford\",\"model\":\"Mustang\",\"Fuel\":\"Petrol\",\"Engine Size\":\"6.3 L\",\"Year\":\"2016\",\"Power\":\"250 KW\",\"Seats\":\"2\"}', 1, 35000, '557744884', 'This Mustang features the desirable 6-speed manual transmission.\r\nThe attached Carfax history report shows no accidents or mileage discrepancies in this Mustang\'s past.\r\nAccording to the window sticker provided in the gallery, factory equipment includes the Reverse Sensing System, HID/Security, and Brembo Brake packages, Equipment Group 401A, a limited-slip differential, a 3.73:1 final drive ratio, a Shaker 500 audio system, leather upholstery, air conditioning, and more as detailed below.\r\nModifications to this Mustang are extensive, and the full list is detailed below. Highlights include a ProCharger P1X supercharger, intercooler, and Big Red blow-off valve, BBK 1 7/8th long-tube headers, aftermarket high-flow catalytic converters, Corsa Sport mufflers, and 17-inch Forgestar F14 rear wheels with Mickey Thompson Street SS tires.', '2024-12-12 21:43:36', '2024-12-12 21:43:36'),
(7, 3, '{\"make\":\"Harley-Davidson\",\"model\":\"FXD\",\"Engine size\":\"1.4\",\"Power\":\"42 KW\",\"Year\":\"1998\",\"Type\":\"Chopper\"}', 1, 5000, '55788459', 'Well maintained bike, used by grandma to drive to church and back', '2024-12-12 21:52:18', '2024-12-12 21:52:18'),
(9, 1, '{\"make\":\"Porsche\",\"model\":\"911 Carrera\",\"Fuel\":\"Petrol\",\"Engine Size\":\"3.8 L\",\"Year\":\"2010\",\"Power\":\"456 KW\",\"Seats\":\"2\"}', 4, 120000, '+37060097334', 'This 911 is equipped with the desirable 6-speed manual transmission, and the odometer currently indicates 54,600 miles.\r\nThe attached Carfax history report indicates no accidents or mileage discrepancies.\r\nAccording to the build sheet provided in the photo gallery, factory equipment includes a speed-activated rear spoiler, dynamic cornering lights, a sunroof, leather upholstery, heated and ventilated front seats, and a Bose surround sound system.', '2024-12-13 02:18:55', '2024-12-13 02:18:55'),
(10, 1, '{\"make\":\"BMW\",\"model\":\"525d\",\"Fuel\":\"Diesel\",\"Engine Size\":\"2.5 L\",\"Year\":\"2000\",\"Power\":\"105 KW\",\"Seats\":\"5\"}', 4, 5400, '+443224255', 'classic bmw legend, no low ballers, i know what i have.\r\n\r\nprice on listing without wheels', '2024-12-13 02:23:26', '2024-12-13 02:23:26'),
(11, 2, '{\"make\":\"Volvo\",\"model\":\"FH 13\",\"Towing Capacity\":\"20000 kg\",\"Fuel\":\"Diesel\",\"Year\":\"2013\",\"Power\":\"397 KW\",\"Weight\":\"16760 kg\"}', 4, 54300, '44773366', 'Slightly used, never abused', '2024-12-13 02:28:16', '2024-12-13 02:28:16'),
(12, 2, '{\"make\":\"Mercedes-Benz\",\"model\":\"11-14\",\"Towing Capacity\":\"18800 kg\",\"Fuel\":\"Diesel\",\"Year\":\"1996\",\"Power\":\"240 KW\",\"Weight\":\"16000 kg\"}', 4, 13000, '333563523', 'Kinda used, lighly abused', '2024-12-13 02:29:39', '2024-12-13 02:29:39'),
(13, 2, '{\"make\":\"Scania\",\"model\":\"R580\",\"Towing Capacity\":\"30000 kg\",\"Fuel\":\"Diesel\",\"Year\":\"2010\",\"Power\":\"300 KW\",\"Weight\":\"25000 kg\"}', 4, 23000, '222323243', 'Very good truck', '2024-12-13 02:30:52', '2024-12-13 02:30:52'),
(14, 2, '{\"make\":\"Volkswagen\",\"model\":\"LT\",\"Towing Capacity\":null,\"Fuel\":\"Diesel\",\"Year\":\"1992\",\"Power\":null,\"Weight\":null}', 4, 1000, '122345533', 'take this off my hands pls need gone by thursday', '2024-12-13 02:32:53', '2024-12-13 02:32:53'),
(15, 5, '{\"test\":null}', 1, 44434, '444', 'ssdsd', '2024-12-20 00:34:54', '2024-12-20 00:34:54'),
(16, 8, '{\"make\":\"asasas\",\"model\":\"asas\",\"year\":\"3333\",\"engine_size\":\"333\",\"seats\":\"3\",\"storage_capacity\":\"333\",\"weight\":\"333\"}', 6, 333, '333', 'aasas', '2024-12-20 01:54:51', '2024-12-20 01:54:51'),
(17, 9, '{\"make\":\"Toyota\",\"model\":\"Hilux\"}', 1, NULL, NULL, NULL, '2024-12-20 02:02:50', '2024-12-20 02:02:50'),
(18, 9, '{\"make\":\"Toyotas\",\"model\":\"Hiluxas\"}', 6, NULL, NULL, NULL, '2024-12-20 02:04:47', '2024-12-20 02:04:47'),
(19, 9, '{\"make\":\"Toyotasas\",\"model\":\"Hiluxas\"}', 6, NULL, NULL, NULL, '2024-12-20 02:05:05', '2024-12-20 02:05:05');

-- --------------------------------------------------------

--
-- Table structure for table `listing_photos`
--

CREATE TABLE `listing_photos` (
  `id` bigint(20) NOT NULL,
  `listing_id` bigint(20) UNSIGNED NOT NULL,
  `photo_path` varchar(255) NOT NULL,
  `is_primary` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `listing_photos`
--

INSERT INTO `listing_photos` (`id`, `listing_id`, `photo_path`, `is_primary`, `created_at`, `updated_at`) VALUES
(1, 5, 'listings/5/qkW3eyGRAgeDlSEEEj6ElP3POuQZyOTZyd3fWJew.jpg', 1, '2024-12-12 21:37:08', '2024-12-12 21:37:08'),
(2, 5, 'listings/5/6pxiL6Hr74575aIh3CHwRs4thHe2KvSl1gPMyzP2.jpg', 0, '2024-12-12 21:37:08', '2024-12-12 21:37:08'),
(3, 5, 'listings/5/CTi1HhEM7XONndBfx7ox0axPcqdfO20l41IGMp9R.jpg', 0, '2024-12-12 21:37:08', '2024-12-12 21:37:08'),
(4, 5, 'listings/5/VpHpE79FuAy1xnenVF6A48oMTcYyh2HBAQbWtzi9.jpg', 0, '2024-12-12 21:37:08', '2024-12-12 21:37:08'),
(5, 5, 'listings/5/f3rpJGNT1jSg4mzN8Qw5ft7DJk7nBs5w32Ajl0Mu.jpg', 0, '2024-12-12 21:37:08', '2024-12-12 21:37:08'),
(6, 6, 'listings/6/jjgKlETMVHJPltZcQSG1GnIm2YIyo7d46uwsTESd.jpg', 1, '2024-12-12 21:43:36', '2024-12-12 21:43:36'),
(7, 6, 'listings/6/ssxXUW0DeomyDLIf1shm2b859EgF185GbFuPAcII.jpg', 0, '2024-12-12 21:43:36', '2024-12-12 21:43:36'),
(8, 6, 'listings/6/J6hzXAOzdGrGTxtpZe5AOM1UdXgW30L6K8KsrUhC.jpg', 0, '2024-12-12 21:43:36', '2024-12-12 21:43:36'),
(9, 7, 'listings/7/HxtJ2Fk6XiSW6h6oIbYV3sllg8TTcq2gvwdayrMh.jpg', 1, '2024-12-12 21:52:18', '2024-12-12 21:52:18'),
(10, 7, 'listings/7/46m6c7Tr5taCYF7iyYNxLU36lS5y1yi4o50dmq3q.jpg', 0, '2024-12-12 21:52:18', '2024-12-12 21:52:18'),
(11, 9, 'listings/9/CGVtOB99N1LI9uE9JCmvDHZuq1egqRx8GNKj2V7M.jpg', 1, '2024-12-13 02:18:55', '2024-12-13 02:18:55'),
(12, 9, 'listings/9/EnuajIIs6fix8EwVxOBxR9UaHeB19YUAbZDzvfWH.jpg', 0, '2024-12-13 02:18:55', '2024-12-13 02:18:55'),
(13, 9, 'listings/9/kPjWTdV3JtNJEG15PKbKpLwMnfFAJ9qrlmAD21mE.jpg', 0, '2024-12-13 02:18:55', '2024-12-13 02:18:55'),
(14, 9, 'listings/9/FCTPUE6UhUkgMisA50Nl3N1ZFuFxYwmTWnZ8oyCg.jpg', 0, '2024-12-13 02:18:55', '2024-12-13 02:18:55'),
(18, 10, 'listings/10/hB4ihf6ovBjY2GLUAtXD8ewKGlJx30fUqKBDPKcR.jpg', 1, '2024-12-13 02:24:58', '2024-12-13 02:24:58'),
(19, 10, 'listings/10/rSWDh9H3CHAI4tynN6c91VYfoGHc6rcVvsSCH5gc.jpg', 0, '2024-12-13 02:24:58', '2024-12-13 02:24:58'),
(20, 11, 'listings/11/O2bYddKg4tVJavKP7jZd0npA6U8yrU2Hi7tWzeZl.jpg', 1, '2024-12-13 02:28:16', '2024-12-13 02:28:16'),
(21, 11, 'listings/11/binGnqMn07pdvuu1gP1zhVvGt0XFIxmJx6CHj7mP.jpg', 0, '2024-12-13 02:28:16', '2024-12-13 02:28:16'),
(22, 12, 'listings/12/5ewvtjcgcqjy0y3NZNi0a2n78ghKsiNCPOc2qDSg.jpg', 1, '2024-12-13 02:29:39', '2024-12-13 02:29:39'),
(23, 13, 'listings/13/BUcSgMDxjdRgYInCeGspGoNr5HaiT4EB2McoDhx6.jpg', 1, '2024-12-13 02:30:52', '2024-12-13 02:30:52'),
(24, 14, 'listings/14/2oDp6pvmxLfEKC6oMrCqiSYvpgj660msxrfQuqaN.jpg', 1, '2024-12-13 02:32:53', '2024-12-13 02:32:53');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_10_11_003306_create_vehicle_types_table', 1),
(5, '2024_10_11_013906_create_listings_table', 1),
(6, '2024_10_18_005847_create_comments_table', 1),
(7, '2024_11_15_022714_add_role_to_users_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('5lcNGqGzaYSZnVcIRn6sf7upDhsrLjSEEWFS29Cq', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibDRvZm1iS2NwanJFSjFHc2duVmh1Q1liRldYMWlNbHcxVFJJUkJQeiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9iZWxlbmthaXBzdmFyYnVzZmFpbGFzLnBocCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1734583900),
('E4rJdiklcf2wRqZKmHcBLdrm1VGbE0QVO7BsnEZ3', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiT1N0QlRZdFpIRWswUVJ2MHdaMkZSbHFSQnliTDVSd1JxbmdpSEZBbCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sb2dpbiI7fX0=', 1734671688),
('f33hjXRtDdc8FkZVHt6smGIzOe9A07NTgqXgqsoo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZjhmQzY4YzNKbm0xSFB1dE9Hckc3dUZpczk3TWNFN1c5OUJwUGtSSiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1734577904),
('fkyRO2HoXSUHM7YNUP86ZLS5OXnLnc1f0WfiBav9', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoidmxvOHVUTGc3MmNmM0ZGNTdLaXFHR1Q2OGp0YkEzRkdJblNpMmZhdCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9saXN0aW5ncy85LzE5Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1734671904),
('GjNtFJM6Zbp0mdwNvJsPp9U6rkLs2tMv7oRdpotU', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMFI4ZHRMOUNVdVFjbm9ZRXFTZU83cFpINGFZMUNJSFNqcDl0b2FSdyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fX0=', 1734576399),
('hKMZFszvb1I0euKlnt9PxI1CuFn6owNMM3UGFq5a', NULL, '127.0.0.1', 'PostmanRuntime/7.43.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicUtBR3ZMT0ZGNUVUMVdxdmFLZkdYRFFxUjFmeVVtZmlDQlF5UzhmbSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NjQ6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hcGkvdmVoaWNsZS10eXBlcy85L2xpc3RpbmdzLzE5L2NvbW1lbnRzLzYiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1734671585),
('IFZFi6gI9FAzHnbxLKAgQDRxcY0cgmXnIGc8VxpM', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOVNkQzFPTFZFaHFDZWhFc0tNTmUyNGtXbDlqMnZQNlZERkJsdW1PYiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6OTY6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zdG9yYWdlL2FwcC9wdWJsaWMvbGlzdGluZ3MvNS9xa1czZXlHUkFnZURsU0VFRWo2RWxQM1BPdVFaeU9UWnlkM2ZXSmV3LmpwZyI7fX0=', 1734584814),
('mCKp3Q0YMHY9p1OHPw9HEjalojcrf382EdG0IEEK', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiY2twZ0E4cGFSbGxDeHRNQnZ0Q0xHNTBHZ1FZV3l1eDltaVh6eE4zbSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1734577665),
('QyzQEJTFoSWC8xkGzP6vbJ8VVOeCtD4hs0KauJbW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRE9TVWdNZkJhdFNwdUpUWjVHZzlFdHJTTloxemxOMTI4VWptQTdKNyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1734578519),
('SL7MGPzDHQrSGm5uHdrQzd9FQLcPlwFY1YvLXvXx', NULL, '127.0.0.1', 'PostmanRuntime/7.43.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiSFhpTE5KRXpUUDdTd294anI5aDA5ZU1tdWpCeTBndkRlcGwwR0I3WCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1734576811),
('uFTYKUmiFu03cnPN6TIFgSQwQNtgmIbrX467Wt31', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUU9FQUt2TVN0VkNjY3BySkpMQXpXUFh2MXZVa0VrUHl1SzJZZ1pSMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1734577734);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Administrator', 'admin@automarket.tld', 'admin', NULL, '$2y$12$oGYxhXFLpIHDc/SegmTxy.JPYe7oka9Ak0zB4DhwtQ0DYbmOCj5sW', NULL, '2024-12-12 16:42:02', '2024-12-12 16:42:02'),
(2, 'John Doe', 'johndoe@auto.tld', 'user', NULL, '$2y$12$rnCh5wR2tuKe3KSHhR4sEuK9HfIlFdp/zoYviwimM9MAqEJqevRuG', NULL, '2024-12-12 16:51:31', '2024-12-12 16:51:31'),
(3, 'Paulekas', 'saulekas@a.c', 'user', NULL, '$2y$12$K01SReIItxLdimLZhO47J.U3c6LMS77Ja2A3bPTcL43BDKAhHMWc.', NULL, '2024-12-12 22:27:52', '2024-12-12 22:27:52'),
(4, 'Jonas', 'jonas@test.lt', 'user', NULL, '$2y$12$E7aKvIt6dpg4.9/HOXJ0X.vNwfxYiYa3B5uRGTJLhFv7Y7eQIDtBy', NULL, '2024-12-13 02:16:48', '2024-12-13 02:16:48'),
(5, 'Test', 'test@test.tld', 'user', NULL, '$2y$12$PRGd/znJuVKYbUdPclQc0OXAI9ZJcCtSyrDlxzJ8nLo9hJB5v.xre', NULL, '2024-12-13 03:55:26', '2024-12-13 03:55:26'),
(6, 'Testing', 'test@test', 'user', NULL, '$2y$12$HfilXIRKWBsPAmNj0FyTbOSkx77D.QBdnJOsewW6.VhUuEH2MBWTK', NULL, '2024-12-19 00:35:41', '2024-12-19 00:35:41');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_types`
--

CREATE TABLE `vehicle_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `fields` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`fields`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vehicle_types`
--

INSERT INTO `vehicle_types` (`id`, `name`, `fields`, `created_at`, `updated_at`) VALUES
(1, 'Car', '[{\"name\":\"make\",\"required\":true},{\"name\":\"model\",\"required\":true},{\"name\":\"Fuel\",\"required\":false},{\"name\":\"Engine Size\",\"required\":false},{\"name\":\"Year\",\"required\":false},{\"name\":\"Power\",\"required\":false},{\"name\":\"Seats\",\"required\":false}]', '2024-12-12 16:45:22', '2024-12-12 16:45:22'),
(2, 'Truck', '[{\"name\":\"make\",\"required\":true},{\"name\":\"model\",\"required\":true},{\"name\":\"Towing Capacity\",\"required\":false},{\"name\":\"Fuel\",\"required\":false},{\"name\":\"Year\",\"required\":false},{\"name\":\"Power\",\"required\":false},{\"name\":\"Weight\",\"required\":false}]', '2024-12-12 21:49:07', '2024-12-12 21:49:07'),
(3, 'Motorcycle', '[{\"name\":\"make\",\"required\":true},{\"name\":\"model\",\"required\":true},{\"name\":\"Engine size\",\"required\":false},{\"name\":\"Power\",\"required\":false},{\"name\":\"Year\",\"required\":false},{\"name\":\"Type\",\"required\":false},{\"name\":\"Test\",\"required\":false}]', '2024-12-12 21:50:00', '2024-12-20 00:34:10'),
(5, 'Test Type', '[{\"name\":\"test\",\"required\":false}]', '2024-12-20 00:34:35', '2024-12-20 00:34:35'),
(8, 'TestTypas', '[{\"name\":\"make\",\"required\":true},{\"name\":\"model\",\"required\":true},{\"name\":\"year\",\"required\":true},{\"name\":\"engine_sizas\",\"required\":false},{\"name\":\"seats\",\"required\":true},{\"name\":\"storage_capacity\",\"required\":true},{\"name\":\"weight\",\"required\":true}]', '2024-12-20 01:51:34', '2024-12-20 01:56:58'),
(9, 'Testing', '[{\"name\":\"make\",\"required\":true},{\"name\":\"model\",\"required\":true}]', '2024-12-20 01:59:05', '2024-12-20 01:59:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_user_id_foreign` (`user_id`),
  ADD KEY `comments_listing_id_foreign` (`listing_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listings`
--
ALTER TABLE `listings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `listings_vehicle_type_id_foreign` (`vehicle_type_id`),
  ADD KEY `listings_user_id_foreign` (`user_id`);

--
-- Indexes for table `listing_photos`
--
ALTER TABLE `listing_photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `listing_id` (`listing_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `vehicle_types`
--
ALTER TABLE `vehicle_types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `listings`
--
ALTER TABLE `listings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `listing_photos`
--
ALTER TABLE `listing_photos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `vehicle_types`
--
ALTER TABLE `vehicle_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_listing_id_foreign` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `listings`
--
ALTER TABLE `listings`
  ADD CONSTRAINT `listings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `listings_vehicle_type_id_foreign` FOREIGN KEY (`vehicle_type_id`) REFERENCES `vehicle_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `listing_photos`
--
ALTER TABLE `listing_photos`
  ADD CONSTRAINT `listing_photos_ibfk_1` FOREIGN KEY (`listing_id`) REFERENCES `listings` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

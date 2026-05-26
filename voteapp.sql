-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Máj 26. 11:45
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `voteapp`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `options`
--

CREATE TABLE `options` (
  `id` int(11) NOT NULL,
  `poll_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `options`
--

INSERT INTO `options` (`id`, `poll_id`, `name`) VALUES
(1, 1, 'Teszt opció#1'),
(3, 2, 'Teszt opció#1'),
(5, 3, 'Nem hiszem'),
(10, 2, 'asfafgsafg'),
(12, 2, 'bbbb'),
(13, 2, '345345');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `polls`
--

CREATE TABLE `polls` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `polls`
--

INSERT INTO `polls` (`id`, `title`, `created_at`) VALUES
(2, 'Új title #1', '2026-05-26 08:43:27'),
(3, 'Vége lesz valaha?', '2026-05-26 09:23:04');

-- --------------------------------------------------------

--
-- A nézet helyettes szerkezete `poll_stats`
-- (Lásd alább az aktuális nézetet)
--
CREATE TABLE `poll_stats` (
`poll_id` int(11)
,`title` varchar(150)
,`option_id` int(11)
,`name` varchar(100)
,`vote_count` bigint(21)
);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `votes`
--

CREATE TABLE `votes` (
  `id` int(11) NOT NULL,
  `option_id` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `votes`
--

INSERT INTO `votes` (`id`, `option_id`, `date`) VALUES
(1, 2, '2026-05-26 08:52:53'),
(2, 3, '2026-05-26 08:56:19'),
(3, 5, '2026-05-26 10:04:40'),
(4, 5, '2026-05-26 10:04:42'),
(5, 5, '2026-05-26 10:04:43'),
(6, 11, '2026-05-26 10:05:20'),
(7, 12, '2026-05-26 10:26:14'),
(8, 5, '2026-05-26 11:33:58'),
(9, 13, '2026-05-26 11:38:04');

-- --------------------------------------------------------

--
-- Nézet szerkezete `poll_stats`
--
DROP TABLE IF EXISTS `poll_stats`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `poll_stats`  AS SELECT `p`.`id` AS `poll_id`, `p`.`title` AS `title`, `o`.`id` AS `option_id`, `o`.`name` AS `name`, count(`v`.`id`) AS `vote_count` FROM ((`polls` `p` join `options` `o` on(`p`.`id` = `o`.`poll_id`)) left join `votes` `v` on(`o`.`id` = `v`.`option_id`)) GROUP BY `p`.`id`, `p`.`title`, `o`.`id`, `o`.`name` ;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `options`
--
ALTER TABLE `options`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `polls`
--
ALTER TABLE `polls`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `options`
--
ALTER TABLE `options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `polls`
--
ALTER TABLE `polls`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT a táblához `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

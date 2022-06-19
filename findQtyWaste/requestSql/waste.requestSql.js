'use strict';
const requestSql = {
  qtyTotalBySite: qtyTotalBySite(),
  qtyTotal: qtyTotal(),
};

function qtyTotalBySite() {
  return 'SELECT SUM(`detaildepot`.`QuantiteDeposee`) AS `QuantityTotal`,\
		`typedechet`.`NomTypeDechet` AS `NameDechet`,`centretraitement`.`NoCentre` \
		FROM detaildepot\
		INNER JOIN `typedechet` ON `typedechet`.`NoTypeDechet` = `detaildepot`.`NoTypeDechet`\
		INNER JOIN `centretraitement`ON `centretraitement`.`NoCentre` = `detaildepot`.`NoCentre`\
		INNER JOIN `tournee`ON `tournee`.`NoTournee` = `detaildepot`.`NoTournee`\
		WHERE `centretraitement`.`NoCentre` = ? AND `typedechet`.`NomTypeDechet` = ?\
		AND `tournee`.`DateTournee` BETWEEN  ? AND ? ';
}

function qtyTotal() {
  return 'SELECT SUM(`detaildepot`.`QuantiteDeposee`) AS `QuantityTotal`,\
		`typedechet`.`NomTypeDechet` AS `NameDechet`\
		FROM detaildepot\
		INNER JOIN `typedechet` ON `typedechet`.`NoTypeDechet` = `detaildepot`.`NoTypeDechet`\
		INNER JOIN `tournee`ON `tournee`.`NoTournee` = `detaildepot`.`NoTournee`\
		WHERE `typedechet`.`NomTypeDechet` = ?\
		AND `tournee`.`DateTournee` BETWEEN  ? AND ? ';
}

module.exports = requestSql;

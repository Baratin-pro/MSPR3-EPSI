const requestSql = {
  browseRequestsNotRegisteredInRouteBySite: browseRequestsNotRegisteredInRouteBySite(),
};

function browseRequestsNotRegisteredInRouteBySite() {
  return 'SELECT `demande`.`NoDemande` AS `id`,\
		`demande`.`Siret` AS `NoSite`\
		FROM demande\
		WHERE `demande`.`NoTournee` IS NULL';
}

module.exports = requestSql;

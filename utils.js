const Gio = imports.gi.Gio;
const ExtensionUtils = imports.misc.extensionUtils;

function getSettings() {
	const extension = ExtensionUtils.getCurrentExtension();
	const schema = 'org.gnome.shell.extensions.codium-search-provider';

	const GioSSS = Gio.SettingsSchemaSource;

	const schemaDir = extension.dir.get_child('schemas');
	let schemaSource;
	if (schemaDir.query_exists(null)) {
		schemaSource = GioSSS.new_from_directory(schemaDir.get_path(),
			GioSSS.get_default(),
			false);
	} else {
		schemaSource = GioSSS.get_default();
	}

	const schemaObj = schemaSource.lookup(schema, true);
	if (!schemaObj) {
		throw new Error('Schema ' + schema + ' could not be found for extension ' +
			extension.metadata.uuid + '. Please check your installation.');
	}

	return new Gio.Settings({ settings_schema: schemaObj });
}
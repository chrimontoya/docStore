from datetime import datetime, timezone

def get_init_date(value: str = ''):
    """
    Convierte una fecha en formato `DD-MM-YYYY` a un objeto `datetime`
    configurado en UTC a las 00:00:00.

    :param value: Fecha como cadena en formato `DD-MM-YYYY`.
                  Por defecto, una cadena vacía.
    :return: Objeto `datetime` correspondiente a la fecha indicada,
             con zona horaria UTC y hora `00:00:00`.

    :raises ValueError: Si `value` no tiene el formato esperado o
                        representa una fecha inválida.

    :example:
        >>> get_init_date('24-09-2026')
        datetime.datetime(2026, 9, 24, 0, 0, tzinfo=datetime.timezone.utc)
    """
    if not value:
        return ''

    expected_format = '%d-%m-%Y'

    date = datetime.combine(
        datetime.strptime(value, expected_format),
        datetime.min.time(),
        tzinfo=timezone.utc,
    )
    return date
